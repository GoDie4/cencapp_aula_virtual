import { config } from "@/config/config";

export async function getServerSideProps(url: string) {
  try {
    const res = await fetch(`${config.apiUrl}/${url}`, { cache: "no-store" });
    if (!res.ok) {
        return
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return
    }
    const data = await res.json();

    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}
