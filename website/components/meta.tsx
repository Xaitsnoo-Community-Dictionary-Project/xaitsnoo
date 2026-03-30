import Head from "next/head";

export default function Meta({ title }: { title?: string }) {
  return (
    <Head>
      <title>{`${title ? `${title} | ` : ""}Xaitsnoo Community Dictionary Project`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');</style>
    </Head>
  );
}
