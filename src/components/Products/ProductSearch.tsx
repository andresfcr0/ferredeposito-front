import { useState } from "react";
import {
  TextField,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { getProductLike } from "../../services/API";
import type { Product } from "../../types";

export default function ProductSearch() {
  const [results, setResults] = useState<
    { product: Product; quantity: number; price: number }[]
  >([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const removeProduct = (index: number) => {
    setResults((prev) => prev.filter((_, i) => i !== index));
  };

  const addProduct = (product: Product | null) => {
    if (product) {
      setResults((prev) => [
        ...prev,
        { product, quantity: 1, price: product.sale_price },
      ]);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    setResults((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item)),
    );
  };

  const updatePrice = (index: number, price: number) => {
    setResults((prev) =>
      prev.map((item, i) => (i === index ? { ...item, price } : item)),
    );
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 5,
          mb: 4,
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          p: 5,
          borderRadius: 2,
        }}
      >
        <Autocomplete
          options={products}
          getOptionLabel={(option) => option.name}
          value={selectedProduct}
          onChange={(_event, newValue) => addProduct(newValue)}
          onInputChange={async (_event, newInputValue) => {
            if (newInputValue) {
              const a = await getProductLike(newInputValue);
              setProducts(a);
            } else {
              setProducts([]);
            }
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {option.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: $
                  {option.sale_price.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}{" "}
                  | Stock: {option.stock} | Unidad: {option.unit}
                </Typography>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Producto"
              variant="filled"
              fullWidth
            />
          )}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "10%" }} align="center">
                  Acciones
                </TableCell>
                <TableCell sx={{ width: "30%" }} align="center">
                  Producto
                </TableCell>
                <TableCell sx={{ width: "15%" }} align="center">
                  Cantidad
                </TableCell>
                <TableCell sx={{ width: "15%" }} align="center">
                  Precio
                </TableCell>
                <TableCell sx={{ width: "20%" }} align="center">
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ align: "center" }}>
              {results.map((item, index) => (
                <TableRow key={`${item.product.id}-${index}`}>
                  <TableCell align="center">
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => removeProduct(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">{item.product.name}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value) || 1)
                      }
                      size="small"
                      inputProps={{ min: 1 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updatePrice(index, parseFloat(e.target.value) || 0)
                      }
                      size="small"
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    $
                    {(item.quantity * item.price).toLocaleString("es-ES", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
