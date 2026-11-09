import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Browser-tab icon: the white "FG" logo on the header's dark color, so it
// stays visible in light and dark browser themes. (logo.png alone is white
// on transparent and would disappear in a light tab.) Generated at build.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1b1b1b",
          borderRadius: 7,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={30}
          height={30}
          alt=""
        />
      </div>
    ),
    size
  );
}
