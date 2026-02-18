module.exports = {
  paths: {
    "/api/products": {
      get: {
        tags: ["Products"],
        description: "Get all products",
        operationId: "getProducts",
        parameters: [],
        responses: {
          200: {
            description: "Products obtained successfully",
          },
          500: {
            description: "Server error",
          },
        },
      }
    }, 
    "/api/products/{productId}": {
        get: {
            tags: ["Products"],
            description: "Returns a product by its id",
            operationId: "getProductById",
            parameters: [
            {
                name: "productId",
                in: "path",
                required: true,
                schema: { type: "string" },
                description: "Product id"
            }
            ],
            responses: {
            200: {
                description: "Product obtained successfully",
                content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/Product" }
                }
                }
            },
            404: { description: "Product not found" },
            500: { description: "Server error" }
            }
        },
        put: {
            tags: ["Products"],
            description: "Update Product by Id",
            operationId: "updateProduct",
            parameters: [
            {
                name: "productId",
                in: "path",
                required : true,
                schema: {
                type: "string"
                },
                description: "Id of Product to be updated",
            },
            ],
            requestBody: {
                required: true,
                content: {
                "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
                    },
                },
            },
            responses: {
            200: { description: "Product updated successfully" },
            500: { description: "Server error" },
            },
        },  
        delete: {
            tags: ["Products"],
            description: "Delete Product",
            operationId: "deleteProduct",
            parameters: [
            {
                name: "productId",
                in: "path",
                required : true,
                schema: { type: "string" },
                description: "Id of Product to be deleted",
            },
            ],
            responses: {
            200: { description: "Product deleted successfully" },
            500: { description: "Server error" },
            },
        }
    },   
    "/api/products/create": {
        post: {
            tags: ["Products"],
            description: "Create Product",
            operationId: "createProduct",
            parameters: [],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                    schema: {
                    $ref: "#/components/schemas/Product",
                        },
                    },
                },
            },
            responses: {
              201: {
                description: "Product created successfully",
              },
              500: {
                description: "Server error",
              },
            },
        }
    },
  },
}

