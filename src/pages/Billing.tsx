import ProductSearch from "../components/Products/ProductSearch";
import ClientSearch from "../components/Clients/ClientSearch";

export default function Billing() {
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

      <ClientSearch />
      <ProductSearch />
    </div>
  );
}
