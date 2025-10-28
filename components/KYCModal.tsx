'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function KYCModal({ isOpen, onClose, onComplete }: KYCModalProps) {
  const { address } = useWallet();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    documentType: 'CPF',
    documentNumber: '',
  });

  const [documentUploaded, setDocumentUploaded] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Simula verificação KYC
    console.log('Submitting KYC:', formData);
    
    // Em produção, aqui seria a integração com Fractal ID ou outro provider KYC
    // Por enquanto, simula sucesso
    alert('KYC Verificado! Sua credencial "BR-Investor-Verified" será emitida em breve.');
    
    onComplete({
      ...formData,
      credential: 'BR-Investor-Verified',
      verified: true,
    });
    
    onClose();
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simula upload do documento
      console.log('Uploading document:', file.name);
      setDocumentUploaded(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Verificação de Identidade (KYC)</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-semibold">Dados Pessoais</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`} style={{ width: step >= 2 ? '100%' : '0%' }} />
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-semibold">Documentos</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CPF *
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="000.000.000-00"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Endereço *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="00000-000"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-2">🔒 Privacidade</p>
                <p>Seus dados serão criptografados e usados apenas para compliance (KYC/AML). 
                A credencial &quot;BR-Investor-Verified&quot; será emitida no XRPL sem expor seu CPF.</p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.fullName || !formData.cpf || !formData.email}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                >
                  Próximo Passo
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <p className="font-semibold mb-2">⚠️ Atenção</p>
                <p>Faça upload de uma foto clara e legível do seu documento de identidade.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Documento
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="CPF">CPF</option>
                  <option value="RG">RG</option>
                  <option value="CNH">CNH</option>
                  <option value="Passaporte">Passaporte</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número do Documento
                </label>
                <input
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload do Documento *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="cursor-pointer"
                  >
                    {documentUploaded ? (
                      <div className="text-green-600">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="font-semibold">Documento enviado com sucesso!</p>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p>Clique para fazer upload</p>
                        <p className="text-xs mt-2">PNG, JPG, PDF até 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!documentUploaded || !formData.documentNumber}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                >
                  Finalizar Verificação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

