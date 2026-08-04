export function getAttributes<T>(resource: { id: string; attributes: T }) {
  return {
    id: resource.id,
    ...resource.attributes,
  };
}

export function getCollection<T>(response: {
  data: Array<{
    id: string;
    attributes: T;
  }>;
}) {
  return response.data.map(getAttributes);
}
