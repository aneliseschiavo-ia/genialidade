import { Metadata } from 'next';
import { FormularioDiagnostico } from '@/components/FormularioDiagnostico';

export const metadata: Metadata = {
  title: 'Diagnóstico - Genialidade',
  description: 'Responda 28 questões estratégicas para seu diagnóstico personalizado',
};

export default function FormularioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <FormularioDiagnostico />
    </div>
  );
}
