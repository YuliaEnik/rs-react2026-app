import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "./__tests__/mocks/server";

vi.stubEnv("VITE_API_URL", "https://clevelandart.org");

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
