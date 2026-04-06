import { useState } from "react";
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  Button,
} from "@mui/material";
import { getProductLike, getClientLike } from "../../services/API";
import type { Product, Client } from "../../types";

export default function ProductSearch() {
  const [queryProd, setQueryProduct] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const removeProduct = (id: number) => {
    setResults((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <>
      <Box
        sx={{
          width: "40vw",
          display: "flex",
          gap: 5,
          mb: 4,
          backgroundColor: "#f5f5f5",
          p: 5,
          borderRadius: 2,
        }}
      >
        <Autocomplete
          fullWidth
          options={clients}
          getOptionLabel={(option) => option.name}
          value={selectedClient}
          onChange={(_event, newValue) => setSelectedClient(newValue)}
          onInputChange={async (_event, newInputValue) => {
            if (newInputValue) {
              const a = await getClientLike(newInputValue);
              setClients(a);
            } else {
              setClients([]);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Cliente"
              variant="filled"
              fullWidth
            />
          )}
        />
        <Autocomplete
          fullWidth
          options={clients}
          getOptionLabel={(option) => option.document_number}
          value={selectedClient}
          onChange={(_event, newValue) => setSelectedClient(newValue)}
          onInputChange={async (_event, newInputValue) => {
            if (newInputValue) {
              const a = await getClientLike(undefined, newInputValue);
              setClients(a);
            } else {
              setClients([]);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Cliente"
              variant="filled"
              fullWidth
            />
          )}
        />
        {/* {selectedClient && (
          <TextField
            label="Documento do Cliente"
            variant="filled"
            fullWidth
            value={selectedClient.id}
          />
        )} */}
      </Box>
      <List>
        {results.map((product) => (
          <ListItem
            key={product.id}
            secondaryAction={
              <Button
                size="small"
                color="secondary"
                onClick={() => removeProduct(product.id)}
              >
                Eliminar
              </Button>
            }
          >
            <ListItemText primary={product.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
