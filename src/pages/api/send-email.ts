import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Usar process.env o import.meta.env según el entorno (Vite/Node)
    const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("Falta RESEND_API_KEY");
      return new Response(JSON.stringify({ error: { message: "API Key de Resend no configurada" } }), { status: 500 });
    }

    const resend = new Resend(apiKey);
    const data = await request.json();
    const { name, email, phone, project_type, message } = data;

    console.log("Intentando enviar correo a través de Resend...");

    const { data: resendData, error } = await resend.emails.send({
      from: '3Kubiko Web <onboarding@resend.dev>',
      to: ['3Kubiko.ventas@gmail.com'],
      subject: `Nuevo contacto web - ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <h2>Nuevo mensaje de contacto web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Proyecto:</strong> ${project_type}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    console.log("Correo enviado con éxito:", resendData);
    return new Response(JSON.stringify(resendData), { status: 200 });
  } catch (error) {
    console.error("Error general en el servidor:", error);
    return new Response(JSON.stringify({ error: { message: (error as Error).message } }), { status: 500 });
  }
};
