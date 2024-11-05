import { SRPServer } from "./SRPServer";
import { SRPClient } from "./SRPClient";
import { SRP } from "./SRP";

describe("SRP", () => {
  it("should perform successful negotiation", () => {
    const srp = new SRP("default");
    const client = new SRPClient("default");
    const server = new SRPServer("default");

    const username = "randomKing";
    const password = "pas$$word";
    const salt = srp.generateSalt();
    const verifier = srp.computeVerifier(username, Buffer.from(password), salt);

    // Set credentials
    expect(client.setCredentials(username, Buffer.from(password), salt)).toBe(
      true
    );
    expect(server.setCredentials(username, verifier, salt)).toBe(true);

    // Exchange keys
    expect(server.setClientKey(client.publicKey)).toBe(true);
    expect(client.setServerKey(server.publicKey)).toBe(true);

    // Validate proofs
    expect(server.validateProof(client.proof)).toBe(true);
    expect(client.validateProof(server.proof)).toBe(true);

    // Check session keys
    expect(server.sessionKey.toString("hex")).toBe(
      client.sessionKey.toString("hex")
    );
  });

  it("should generate seed", () => {
    const srp = new SRP("default");
    srp.generateSalt();
  });
});
