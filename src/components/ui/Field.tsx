'use client'

import { useId, type ReactNode } from 'react'
import styles from './Field.module.css'

interface BaseProps {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
}

function fieldIds(id: string, error?: string, hint?: string) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ')
  return { describedBy: describedBy || undefined }
}

function Labelled({
  id,
  label,
  required,
  error,
  hint,
  children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {children}
      {/* Deliberately not role="alert". Every field carries one, so an invalid
          submit fired seven live regions at once and a screen reader read seven
          interruptions over each other. The message is already wired through
          aria-describedby, and the form moves focus to the first invalid field,
          so it is announced on arrival — then each remaining one as the visitor
          reaches it. */}
      {error ? (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextFieldProps = BaseProps & {
  type?: 'text' | 'email'
  placeholder?: string
  autoComplete?: string
}

export function TextField({
  type = 'text',
  placeholder,
  autoComplete,
  ...base
}: TextFieldProps) {
  const id = useId()
  const { describedBy } = fieldIds(id, base.error, base.hint)
  return (
    <Labelled id={id} {...base}>
      <input
        id={id}
        name={base.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={base.required}
        aria-invalid={base.error ? true : undefined}
        aria-describedby={describedBy}
        className={styles.control}
      />
    </Labelled>
  )
}

type TextAreaProps = BaseProps & {
  placeholder?: string
  rows?: number
}

export function TextArea({ placeholder, rows = 4, ...base }: TextAreaProps) {
  const id = useId()
  const { describedBy } = fieldIds(id, base.error, base.hint)
  return (
    <Labelled id={id} {...base}>
      <textarea
        id={id}
        name={base.name}
        rows={rows}
        placeholder={placeholder}
        required={base.required}
        aria-invalid={base.error ? true : undefined}
        aria-describedby={describedBy}
        className={`${styles.control} ${styles.textarea}`}
      />
    </Labelled>
  )
}

type SelectFieldProps = BaseProps & {
  options: ReadonlyArray<{ value: string; label: string }>
  placeholder?: string
  defaultValue?: string
}

export function SelectField({
  options,
  placeholder = 'Select one',
  defaultValue = '',
  ...base
}: SelectFieldProps) {
  const id = useId()
  const { describedBy } = fieldIds(id, base.error, base.hint)
  return (
    <Labelled id={id} {...base}>
      <div className={styles.selectWrap}>
        <select
          id={id}
          name={base.name}
          required={base.required}
          defaultValue={defaultValue}
          aria-invalid={base.error ? true : undefined}
          aria-describedby={describedBy}
          className={`${styles.control} ${styles.select}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true" />
      </div>
    </Labelled>
  )
}

/** Visually hidden honeypot input. Real users never see or fill it. */
export function Honeypot({ name }: { name: string }) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor={name}>Company website</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
