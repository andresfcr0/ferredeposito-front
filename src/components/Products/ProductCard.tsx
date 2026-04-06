function ProductCard({ nombre, precio }: any) {
  return (
    <div>
      <h3>{nombre}</h3>
      <p>${precio}</p>
    </div>
  );
}
