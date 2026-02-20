import { createServer, Model, Response } from "miragejs"

// Function to create and start the mock server
export function makeServer({ environment = "development" } = {}) {
  return createServer({
    // Set environment (development / production)
    environment,

    // Define data models
    // Mirage will store cards internally in memory
    models: {
      card: Model,
    },

    // Seed initial fake data (runs once when server starts)
    seeds(server) {
      server.create("card", {
        id: "1771586665782",
        title: "First Card",
        description: "Test description",
        color: "#4ECDC4",
      })

      server.create("card", {
        id: "1771586665783",
        title: "Second Card",
        description: "Another test card",
        color: "#FF6B6B",
      })
    },

    routes() {
      // Prefix all routes with /api
      this.namespace = "api"

      // Simulate network delay (500ms)
      this.timing = 500

      // =========================
      // GET ALL CARDS
      // =========================
      // Returns only array of cards (not wrapped in { cards: [] })
      this.get("/cards", (schema) => {
        return schema.cards.all().models
      })

      // =========================
      // CREATE NEW CARD
      // =========================
      this.post("/cards", (schema, request) => {
        // Parse incoming JSON body
        let attrs = JSON.parse(request.requestBody)

        // Create new card with unique id
        let newCard = schema.cards.create({
          ...attrs,
          id: Date.now().toString(),
        })

        // Return plain object
        return newCard.attrs
      })

      // =========================
      // UPDATE CARD
      // =========================
      this.put("/cards/:id", (schema, request) => {
        let id = request.params.id
        let attrs = JSON.parse(request.requestBody)

        // Find card by id
        let card = schema.cards.find(id)

        // If not found → return 404 error
        if (!card) {
          return new Response(404, {}, { error: "Card not found" })
        }

        // Update and return updated card
        return card.update(attrs).attrs
      })

      // =========================
      // DELETE CARD
      // =========================
      this.delete("/cards/:id", (schema, request) => {
        let id = request.params.id

        // Find card
        let card = schema.cards.find(id)

        // If not found → return error
        if (!card) {
          return new Response(404, {}, { error: "Card not found" })
        }

        // Remove from Mirage memory database
        card.destroy()

        return { success: true }
      })
    },
  })
}