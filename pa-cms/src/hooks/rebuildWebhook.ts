// Helper de Webhook para disparar o rebuild estático ao alterar mídias ou conteúdos no Payload CMS
export const triggerRebuildHook = async () => {
  const webhookUrl = process.env.DEPLOY_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    console.log('🚀 [Payload Hook] Disparando Webhook de Deploy para recompilação estática...');
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'cms_updated',
        timestamp: new Date().toISOString(),
      }),
    });
    console.log('✓ [Payload Hook] Webhook de Deploy disparado com sucesso!');
  } catch (err: any) {
    console.error('⚠️ [Payload Hook] Erro ao enviar Webhook de Deploy:', err?.message || err);
  }
};
