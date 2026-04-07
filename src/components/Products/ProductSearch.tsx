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

type CartItem = { product: Product; quantity: number; price: number };

interface ProductSearchProps {
  results: CartItem[];
  setResults: (
    results: CartItem[] | ((prev: CartItem[]) => CartItem[]),
  ) => void;
}

export default function ProductSearch({
  results,
  setResults,
}: ProductSearchProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

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

  const getTotal = () => {
    return results.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 5,
          mb: 0,
          backgroundColor: "#f5f5f5",
          p: 4,
          borderRadius: 2,
          boxSizing: "border-box",
        }}
      >
        <Autocomplete
          sx={{ width: "30%" }}
          options={products}
          getOptionLabel={(option) => option.name}
          value={selectedProduct}
          inputValue={inputValue}
          onOpen={() => {}}
          onChange={(_event, newValue) => {
            if (newValue) {
              addProduct(newValue);
              setSelectedProduct(null);
              setInputValue("");
            }
          }}
          onInputChange={(_event, newInputValue, reason) => {
            setInputValue(newInputValue);
            if (reason === "input" && newInputValue) {
              const fetchProducts = async () => {
                const a = await getProductLike(newInputValue);
                setProducts(a);
              };
              fetchProducts();
            } else if (reason === "clear") {
              setProducts([]);
            }
          }}
          noOptionsText="Sin resultados"
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box component="li" key={key} {...otherProps}>
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
            );
          }}
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
        <p style={{ margin: 0, fontWeight: "bold", fontSize: "1.2em" }}>
          Total: $
          {getTotal().toLocaleString("es-ES", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
      </Box>
    </>
  );
}
