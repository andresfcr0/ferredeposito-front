import { useState } from "react";
import ProductSearch from "../components/Products/ProductSearch";
import ClientSearch from "../components/Clients/ClientSearch";
import { registerSale } from "../services/API";
import type { Product, Client } from "../types";
import { Button, Box } from "@mui/material";

export default function Billing() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [results, setResults] = useState<
    { product: Product; quantity: number; price: number }[]
  >([]);

  const generateInvoice = async () => {
    if (!selectedClient || results.length === 0) {
      alert("Debe seleccionar un cliente y agregar productos");
      return;
    }

    const invoiceData = {
      client_id: selectedClient.id,
      items: results.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: results.reduce((sum, item) => sum + item.quantity * item.price, 0),
    };

    try {
      const response = await registerSale(invoiceData);
      console.log(response);
      if (response.success) {
        alert("Factura generada correctamente");
        setSelectedClient(null);
        setResults([]);
      } else {
        alert("Error al generar la factura");
      }

      console.log({ invoiceData });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1 style={{ margin: "0 0 20px 0" }}>Facturación</h1>

      <ClientSearch
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
      <ProductSearch results={results} setResults={setResults} />

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={generateInvoice}
          disabled={!selectedClient || results.length === 0}
        >
          Generar Factura
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedClient(null);
            setResults([]);
          }}
        >
          Limpiar
        </Button>
      </Box>
    </div>
  );
}
