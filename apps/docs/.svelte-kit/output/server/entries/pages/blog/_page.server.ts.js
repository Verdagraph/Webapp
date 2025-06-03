async function load({ fetch }) {
  const response = await fetch("/api/blog");
  const pages = await response.json();
  return { pages };
}
export {
  load
};
