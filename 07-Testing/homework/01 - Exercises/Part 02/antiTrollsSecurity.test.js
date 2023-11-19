const antiTrollsSecurity = require("./antiTrollsSecurity");

describe("PARTE 02", () => {
  describe("Seguridad Anti Trolls", () => {
    it("Debes crear una función", () => {
      expect(typeof antiTrollsSecurity).not.toBe("undefined");
      expect(typeof antiTrollsSecurity).not.toBe("object");
      expect(typeof antiTrollsSecurity).not.toBe("boolean");
      expect(typeof antiTrollsSecurity).not.toBe("number");
      expect(typeof antiTrollsSecurity).not.toBe("bigint");
      expect(typeof antiTrollsSecurity).not.toBe("string");
      expect(typeof antiTrollsSecurity).not.toBe("symbol");
      expect(typeof antiTrollsSecurity).toBe("function");
    });

    it("La función debe llamarse antiTrollsSecurity", () => {
      expect(antiTrollsSecurity.name).toBe("antiTrollsSecurity");
    });

    it("Debe arrojar un error en caso de recibir un parámetro que no sea un string", () => {
      expect(() => antiTrollsSecurity(null)).toThrow(
        "El parámetro recibido debe ser un string"
      );
      expect(() => antiTrollsSecurity({})).toThrow(
        "El parámetro recibido debe ser un string"
      );
      expect(() => antiTrollsSecurity([])).toThrow(
        "El parámetro recibido debe ser un string"
      );
      expect(() => antiTrollsSecurity(true)).toThrow(
        "El parámetro recibido debe ser un string"
      );
      expect(() => antiTrollsSecurity(false)).toThrow(
        "El parámetro recibido debe ser un string"
      );
      expect(() => antiTrollsSecurity(24)).toThrow(
        "El parámetro recibido debe ser un string"
      );
    });

    it("Debe devolver el mismo string pero habiendo eliminado todas las vocales", () => {
      expect(antiTrollsSecurity("This website is for losers LOL!")).toBe(
        "Ths wbst s fr lsrs LL!"
      );
      expect(antiTrollsSecurity("What are you, a communist?")).toBe(
        "Wht r y,  cmmnst?"
      );
    });

    it("No debe contener espacios en blanco al principio o al final del string", () => {
      expect(antiTrollsSecurity(" This website is for losers LOL!")).toBe(
        "Ths wbst s fr lsrs LL!"
      );
      expect(antiTrollsSecurity("What are you, a communist? ")).toBe(
        "Wht r y,  cmmnst?"
      );
      expect(antiTrollsSecurity(" Hello World ")).toBe("Hll Wrld");
    });
  });
});
