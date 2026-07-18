import { useState, useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cada vez que cambia el mensaje, mostramos la alerta de nuevo
    setVisible(true);

    const temporizador = setTimeout(() => {
      setVisible(false);
    }, 300000);

    // Limpieza: si el componente se desmonta o el mensaje cambia antes
    // de que termine el tiempo, cancelamos el temporizador anterior
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  if (!visible || !mensaje) return null;

  return (
    <div className="alerta-toast">
      ✅ {mensaje}
    </div>
  );
}

export default AlertaNotificacion;