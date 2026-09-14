'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, CheckCircle, Trash2, Loader2 } from 'lucide-react'
import type { KeyStatus } from '@/hooks/use-api-key'

export function ApiKeyField({
  apiKey,
  onKeyChange,
  onValidate,
  onRemove,
  status,
  validating,
  placeholder,
}: {
  apiKey: string
  onKeyChange: (key: string) => void
  onValidate: () => void
  onRemove: () => void
  status: KeyStatus
  validating: boolean
  keyPattern: RegExp
  placeholder: string
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative flex-1">
        <Input
          type={visible ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => onKeyChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Masquer la clé' : 'Afficher la clé'}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onValidate}
        disabled={!apiKey || status === 'valid' || validating}
        aria-label="Valider la clé"
      >
        {validating ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <CheckCircle className="size-4" />
        )}
      </Button>
      {apiKey && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          aria-label="Supprimer la clé"
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </div>
  )
}
