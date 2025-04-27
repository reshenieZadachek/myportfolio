import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";
import { insertMessageSchema } from "../shared/schema.ts";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Save message to storage
      const message = await storage.createMessage(validatedData);
      
      // Return success response
      res.json({
        success: true,
        message: "Message sent successfully",
        data: message
      });
    } catch (error) {
      if (error instanceof ZodError) { 
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request"
        });
      }
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
