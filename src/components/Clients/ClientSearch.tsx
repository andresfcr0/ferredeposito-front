import { useState } from "react";
import { TextField, Box, Autocomplete } from "@mui/material";
import { getClientLike } from "../../services/API";
import type { Client } from "../../types";

export default function ClientSearch() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  return (
    <Box
      sx={{
        width: "100%",
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
  );
}
