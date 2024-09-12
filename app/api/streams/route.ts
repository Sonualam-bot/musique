import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";

//@ts-ignore
import youtubeSearchApi from "youtube-search-api";

const YT_REGEX = new RegExp(
  "^https?://(?:www\\.)?youtube\\.com/watch\\?v=[\\w-]{11}(?:&t=\\d+s)?$"
);

const CreateStreamsSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    1;

    const data = CreateStreamsSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);

    if (!isYt) {
      return NextResponse.json(
        {
          message: "Wrong URL format",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];
    console.log(extractedId);

    const res = await youtubeSearchApi.GetVideoDetails(extractedId);

    console.log("title", res.title);
    console.log("thumbnail", JSON.stringify(res.thumbnail.thumbnails));

    const thumbnails = res.thumbnail.thumbnails.sort(
      (a: { width: number }, b: { width: number }) =>
        a.width < b.width ? -1 : 1
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Can't find video",
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      },
    });

    return NextResponse.json({
      message: "Added stream",
      id: stream.id,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding a stream",
        e,
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });

  return NextResponse.json({
    streams,
  });
}
