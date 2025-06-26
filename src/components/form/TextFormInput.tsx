'use client'
import { DetailedHTMLProps, InputHTMLAttributes, type ReactNode } from 'react'
import {
  Control,
  FieldPath,
  FieldValues,
  Controller,
  PathValue,
} from 'react-hook-form'
import { LuCircleAlert } from 'react-icons/lu'
import { cn } from '@/utils'

type BaseInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>
  id?: string
  name: TName
  label?: string
  className?: string
  labelClassName?: string
  containerClassName?: string
  noValidate?: boolean
  fullWidth?: boolean
}

type ExtendedFormInputProps = {
  startInnerIcon?: ReactNode
  endButton?: ReactNode
}

const TextFormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  id,
  name,
  label,
  className,
  labelClassName,
  containerClassName,
  noValidate,
  fullWidth,
  startInnerIcon,
  endButton,
  ...other
}: FormInputProps<TFieldValues> & BaseInputProps & ExtendedFormInputProps) => {
  return (
    <Controller<TFieldValues, TName>
      control={control}
      defaultValue={'' as PathValue<TFieldValues, TName>}
      render={({ field, fieldState }) => (
        <div
          className={cn(containerClassName, 'relative', {
            'w-full': fullWidth,
          })}
        >
          {label && (
            <label
              className={cn(
                'mb-2 inline-block text-base font-medium text-default-800',
                labelClassName
              )}
              htmlFor={name}
            >
              {label}
            </label>
          )}
          <div className={cn('relative', fullWidth && 'w-full')}>
            <input
              {...other}
              {...field}
              id={id ?? name}
              className={cn(
                'rounded-md border-default-200 px-3 py-2  text-default-950 focus:border-default-200 focus:ring-0',
                { 'ps-10': startInnerIcon },
                endButton ? 'bg-default-50 py-4 pe-16 ps-4' : 'px-4',
                { 'w-full': fullWidth },
                {
                  'border-red-500 focus:border-red-500':
                    !noValidate && fieldState.error?.message,
                },
                className
              )}
            />

            {startInnerIcon && (
              <span className="absolute start-3 top-1/2 -translate-y-1/2">
                {startInnerIcon}
              </span>
            )}

            {endButton && endButton}

            {!noValidate && fieldState.error?.message && (
              <div
                className={cn(
                  'pointer-events-none absolute inset-y-0 flex items-center',
                  endButton ? 'end-20' : 'end-4'
                )}
              >
                <LuCircleAlert size={20} className="text-red-500" />
              </div>
            )}
          </div>

          {!noValidate && fieldState.error?.message && (
            <p className="mt-2 text-xs text-red-600">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
      name={name as TName}
    />
  )
}

export default TextFormInput
