const antiTrollsSecurity = (string) => {
  if (typeof string !== "string") {
    throw new Error("El parámetro recibido debe ser un string");
  }

  return string.replace(/[aeiouAEIOU]/g, "").trim();
};

module.exports = antiTrollsSecurity;
