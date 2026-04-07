import { useState } from "react";
import { TextField, Box, Autocomplete } from "@mui/material";
import { getClientLike } from "../../services/API";
import type { Client } from "../../types";

interface ClientSearchProps {
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
}

export default function ClientSearch({
  selectedClient,
  setSelectedClient,
}: ClientSearchProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [inputValueName, setInputValueName] = useState<string>("");
  const [inputValueDocument, setInputValueDocument] = useState<string>("");

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
        boxSizing: "border-box",
      }}
    >
      <Autocomplete
        fullWidth
        options={clients}
        getOptionLabel={(option) => option.name}
        value={selectedClient}
        inputValue={inputValueName}
        noOptionsText="Sin resultados"
        onChange={(_event, newValue) => {
          setSelectedClient(newValue);
          setInputValueName("");
          setInputValueDocument("");
        }}
        onInputChange={async (_event, newInputValue, reason) => {
          setInputValueName(newInputValue);
          if (reason === "input" && newInputValue) {
            const a = await getClientLike(newInputValue);
            setClients(a);
          } else if (reason === "clear") {
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
        getOptionLabel={(option) => option.document_number || ""}
        value={selectedClient}
        inputValue={inputValueDocument}
        noOptionsText="Sin resultados"
        onChange={(_event, newValue) => {
          setSelectedClient(newValue);
          setInputValueName("");
          setInputValueDocument("");
        }}
        onInputChange={async (_event, newInputValue, reason) => {
          setInputValueDocument(newInputValue);
          if (reason === "input" && newInputValue) {
            const a = await getClientLike(undefined, newInputValue);
            setClients(a);
          } else if (reason === "clear") {
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
    </Box>
  );
}
