export default async function handler(req, res) {
    // Puxa as senhas secretas guardadas no cofre da Vercel
    const URL_SUPABASE = process.env.URL_BANCO;
    const CHAVE_SUPABASE = process.env.CHAVE_BANCO;
    const TELEFONE_ADMIN = process.env.MEU_WHATSAPP;

    const headersConfig = {
        'apikey': CHAVE_SUPABASE,
        'Authorization': `Bearer ${CHAVE_SUPABASE}`,
        'Content-Type': 'application/json'
    };

    if (req.method === 'GET') {
        const resposta = await fetch(`${URL_SUPABASE}/rest/v1/rifa?select=*&order=numero.asc`, { 
            headers: headersConfig 
        });
        const dados = await resposta.json();
        return res.status(200).json(dados);
    }

    if (req.method === 'POST') {
        const { id, updates } = req.body;
        
        await fetch(`${URL_SUPABASE}/rest/v1/rifa?id=eq.${id}`, {
            method: 'PATCH',
            headers: { ...headersConfig, 'Prefer': 'return=minimal' },
            body: JSON.stringify(updates)
        });
        
        return res.status(200).json({ success: true, telefoneAdmin: TELEFONE_ADMIN });
    }
}