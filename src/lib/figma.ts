const FIGMA_API_BASE = "https://api.figma.com/v1";

function getToken(): string {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error("FIGMA_ACCESS_TOKEN is not set");
  }
  return token;
}

async function figmaFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${FIGMA_API_BASE}${endpoint}`, {
    headers: {
      "X-Figma-Token": getToken(),
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Figma API error (${res.status}): ${error}`);
  }

  return res.json() as Promise<T>;
}

// --- Types ---

export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  styles: Record<string, FigmaStyle>;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  [key: string]: unknown;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
}

export interface FigmaStyle {
  key: string;
  name: string;
  styleType: "FILL" | "TEXT" | "EFFECT" | "GRID";
  description: string;
}

export interface FigmaNodesResponse {
  name: string;
  lastModified: string;
  nodes: Record<string, { document: FigmaNode }>;
}

export interface FigmaImagesResponse {
  images: Record<string, string | null>;
}

export interface FigmaFileStylesResponse {
  meta: { styles: FigmaStyle[] };
}

export interface FigmaFileComponentsResponse {
  meta: { components: FigmaComponent[] };
}

// --- API Methods ---

export async function getFile(fileKey: string): Promise<FigmaFile> {
  return figmaFetch<FigmaFile>(`/files/${fileKey}`);
}

export async function getFileNodes(
  fileKey: string,
  nodeIds: string[]
): Promise<FigmaNodesResponse> {
  const ids = nodeIds.join(",");
  return figmaFetch<FigmaNodesResponse>(`/files/${fileKey}/nodes?ids=${ids}`);
}

export async function getImages(
  fileKey: string,
  nodeIds: string[],
  format: "jpg" | "png" | "svg" | "pdf" = "png",
  scale: number = 2
): Promise<FigmaImagesResponse> {
  const ids = nodeIds.join(",");
  return figmaFetch<FigmaImagesResponse>(
    `/images/${fileKey}?ids=${ids}&format=${format}&scale=${scale}`
  );
}

export async function getFileStyles(
  fileKey: string
): Promise<FigmaFileStylesResponse> {
  return figmaFetch<FigmaFileStylesResponse>(`/files/${fileKey}/styles`);
}

export async function getFileComponents(
  fileKey: string
): Promise<FigmaFileComponentsResponse> {
  return figmaFetch<FigmaFileComponentsResponse>(
    `/files/${fileKey}/components`
  );
}
