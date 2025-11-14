import { validatePasswordStrength } from '@/schemas/authSchemas';

interface PasswordStrengthIndicatorProps {
  password: string;
  show: boolean;
}

export default function PasswordStrengthIndicator({
  password,
  show,
}: PasswordStrengthIndicatorProps) {
  if (!show || !password) return null;

  const { requirements, strength } = validatePasswordStrength(password);

  const strengthColors = {
    weak: 'bg-danger-500',
    medium: 'bg-yellow-500',
    strong: 'bg-success-500',
  };

  const strengthText = {
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
  };

  const strengthTextColors = {
    weak: 'text-danger-600',
    medium: 'text-yellow-600',
    strong: 'text-success-600',
  };

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-3">
      {/* Barra de fortaleza */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">
            Fortaleza de la contraseña:
          </span>
          <span
            className={`text-xs font-semibold ${strengthTextColors[strength]}`}
          >
            {strengthText[strength]}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strengthColors[strength]}`}
            style={{
              width: `${(Object.values(requirements).filter(Boolean).length / 5) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Lista de requisitos */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-600 mb-2">Requisitos:</p>

        <RequirementItem
          met={requirements.minLength}
          text="Mínimo 8 caracteres"
        />
        <RequirementItem
          met={requirements.hasLowercase}
          text="Una letra minúscula (a-z)"
        />
        <RequirementItem
          met={requirements.hasUppercase}
          text="Una letra mayúscula (A-Z)"
        />
        <RequirementItem met={requirements.hasNumber} text="Un número (0-9)" />
        <RequirementItem
          met={requirements.hasSpecial}
          text="Un carácter especial (!@#$%^&*)"
        />
      </div>
    </div>
  );
}

function RequirementItem({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <svg
          className="w-4 h-4 text-success-600 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 text-gray-400 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span className={`text-xs ${met ? 'text-gray-700' : 'text-gray-500'}`}>
        {text}
      </span>
    </div>
  );
}