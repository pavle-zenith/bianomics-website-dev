'use client'

import { useReducer, useRef, useEffect, type FormEvent } from 'react'
import {
  snapshotSchema,
  AGENCY_HISTORY_OPTIONS,
  type SnapshotField,
} from '@/lib/validation'
import { track } from '@/lib/analytics'
import { snapshot } from '@/content/site'
import { Button } from '@/components/ui/Button'
import {
  TextField,
  TextArea,
  SelectField,
  Honeypot,
} from '@/components/ui/Field'
import styles from './SnapshotForm.module.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = Partial<Record<SnapshotField, string>>

interface State {
  status: Status
  errors: FieldErrors
  /** A top-level message for the error state. */
  message?: string
}

type Action =
  | { type: 'submit' }
  | { type: 'validationError'; errors: FieldErrors }
  | { type: 'success' }
  | { type: 'error'; message: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'submit':
      return { status: 'submitting', errors: {} }
    case 'validationError':
      return { status: 'idle', errors: action.errors }
    case 'success':
      return { status: 'success', errors: {} }
    case 'error':
      return { status: 'error', errors: {}, message: action.message }
    default:
      return state
  }
}

const initialState: State = { status: 'idle', errors: {} }

export function SnapshotForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)

  // Move focus to the confirmation for screen readers on success.
  useEffect(() => {
    if (state.status === 'success') {
      confirmationRef.current?.focus()
    }
  }, [state.status])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    const parsed = snapshotSchema.safeParse(data)
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors
      const errors: FieldErrors = {}
      for (const key of Object.keys(flat) as (keyof typeof flat)[]) {
        const first = flat[key]?.[0]
        if (first && key !== 'company_website') {
          errors[key as SnapshotField] = first
        }
      }
      dispatch({ type: 'validationError', errors })
      return
    }

    dispatch({ type: 'submit' })

    try {
      const res = await fetch('/api/snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        dispatch({
          type: 'error',
          message:
            'Something went wrong sending your request. Please try again, or reach us by phone or email.',
        })
        return
      }

      track('form_submit_success', {
        has_agency_history: parsed.data.workedWithAgency === 'first' ? 'no' : 'yes',
      })
      dispatch({ type: 'success' })
    } catch {
      dispatch({
        type: 'error',
        message:
          'We could not reach the server. Please check your connection and try again.',
      })
    }
  }

  if (state.status === 'success') {
    return (
      <div
        ref={confirmationRef}
        className={styles.confirmation}
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <span className={styles.confirmationMark} aria-hidden="true" />
        <p className={styles.confirmationText}>{snapshot.success}</p>
      </div>
    )
  }

  const submitting = state.status === 'submitting'

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          error={state.errors.name}
        />
        <TextField
          label="Organization"
          name="org"
          required
          autoComplete="organization"
          error={state.errors.org}
        />
      </div>

      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.errors.email}
      />

      <TextField
        label="What does your org do?"
        name="orgDoes"
        required
        placeholder="one sentence"
        error={state.errors.orgDoes}
      />

      <TextArea
        label="Biggest communications or brand challenge right now?"
        name="biggestChallenge"
        required
        error={state.errors.biggestChallenge}
      />

      <TextArea
        label="What would a win look like in 90 days?"
        name="winIn90Days"
        required
        error={state.errors.winIn90Days}
      />

      <SelectField
        label="Worked with an agency or consultant before?"
        name="workedWithAgency"
        required
        options={AGENCY_HISTORY_OPTIONS}
        error={state.errors.workedWithAgency}
      />

      <Honeypot name="company_website" />

      {state.status === 'error' && state.message ? (
        <p className={styles.formError} role="alert">
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={submitting}
        event="cta_primary_click"
        location="snapshot"
      >
        {submitting ? 'Sending…' : snapshot.submitLabel}
      </Button>
    </form>
  )
}
