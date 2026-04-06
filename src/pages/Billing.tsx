import { Container } from "@mui/material";
import ProductSearch from "../components/Products/ProductSearch";
import ClientSearch from "../components/Clients/ClientSearch";

export default function Billing() {
  return (
    <Container sx={{ maxWidth: 1200 }}>
      <h1>Facturación</h1>

      <ClientSearch />
      <ProductSearch />
    </Container>
  );
}
