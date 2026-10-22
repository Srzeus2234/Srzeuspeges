// Logo component - usa una imagen como logo
// Para cambiar el logo, reemplaza el archivo en public/imagenes/imageLogo.png
// o cambia la ruta src abajo
export default function Logo() {
  return (
    <img
      src="/imagenes/imageLogo.png"
      alt="Logo"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        borderRadius: "50%",
      }}
    />
  );
}