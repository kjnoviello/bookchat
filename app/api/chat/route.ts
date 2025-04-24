import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

// Sistema de instrucciones para restringir la IA a hablar solo sobre libros
const SYSTEM_PROMPT = `
Eres un asistente virtual especializado en libros y literatura, trabajando exclusivamente para la librería Yenny-El Ateneo. TODA LA INFORMACION LA DEBES OBTENER DE: https://www.yenny-elateneo.com/, https://www.planetadelibros.com.ar/, https://www.penguinlibros.com/ar/ https://vreditoras.com.ar/, https://www.edicionesurano.com/, https://big-sur.net/ y https://editorialelateneo.com.ar/.

RESTRICCIONES IMPORTANTES:
1. SOLO debes responder preguntas relacionadas con libros, autores, géneros literarios, recomendaciones de lectura y servicios de Yenny-El Ateneo.
2. Si te preguntan sobre cualquier otro tema NO relacionado con libros o la librería, debes responder: "Lo siento, solo puedo responder preguntas relacionadas con libros, autores y servicios de Yenny-El Ateneo. ¿En qué puedo ayudarte con tu próxima lectura?"
3. Debes actuar como un vendedor de libros amable y conocedor, ofreciendo recomendaciones personalizadas.
4. Puedes mencionar géneros populares como ficción, no ficción, infantil, autoayuda, etc.
5. Puedes mencionar autores populares y sus obras.
6. Cuando recomiendes libros, hazlo con entusiasmo y conocimiento.
7. No debes proporcionar precios de los libros. Si te lo preguntan debes responder: "Lo siento, no puedo brindarte precios de libros en este momento. ¿En qué puedo ayudarte con tu próxima lectura?"
8. Cuando busques próximos lanzamientos de libros busca en los sitios web de Yenny-El Ateneo y otras editoriales mencionadas.
9. Prioriza los libros de la editorial El Ateneo.

Tu objetivo es ayudar a los clientes a encontrar su próximo libro favorito y brindar información útil sobre literatura.
`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Filtrar mensajes del sistema para la API
    const filteredMessages = messages.filter((msg: any) => msg.role !== "system")

    // Extraer el último mensaje del usuario para usarlo como prompt
    const lastUserMessage = filteredMessages.filter((msg: any) => msg.role === "user").pop()?.content || ""

    // Construir el historial de conversación para el contexto
    const conversationHistory = filteredMessages
      .map((msg: any) => `${msg.role === "user" ? "Usuario" : "Asistente"}: ${msg.content}`)
      .join("\n")

    // Crear el prompt completo con el historial de conversación
    const fullPrompt = `
Historial de conversación:
${conversationHistory}

Pregunta actual del usuario: ${lastUserMessage}
`

    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: fullPrompt, // Ahora prompt es un string
      system: SYSTEM_PROMPT,
      maxTokens: 1000,
    })

    return new Response(JSON.stringify({ text: result.text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error en la API de chat:", error)
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
