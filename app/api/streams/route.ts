import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import db from "@/lib/db";

//@ts-ignore
import youtubeSearchApi from "youtube-search-api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { YT_REGEX } from "@/lib/utils";

const CreateStreamsSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamsSchema.parse(await req.json());

    if (!data.url.trim()) {
      return NextResponse.json(
        {
          message: "YouTube link cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const isYt = data.url.match(YT_REGEX);
    const videoId = data.url ? data.url.match(YT_REGEX)?.[1] : null;
    if (!isYt || !videoId) {
      return NextResponse.json(
        {
          message: "Invalid YouTube URL format",
        },
        {
          status: 400,
        }
      );
    }

    const res = await youtubeSearchApi.GetVideoDetails(videoId);

    const thumbnails = res.thumbnail.thumbnails.sort(
      (a: { width: number }, b: { width: number }) =>
        a.width < b.width ? -1 : 1
    );

    const stream = await db.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: videoId,
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
      ...stream,
      hasUpvoted: false,
      upVotes: 0,
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

  if (!creatorId) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 411,
      }
    );
  }

  const streams = await db.stream.findMany({
    where: {
      userId: creatorId,
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
      upvotes: {
        where: {
          userId: creatorId,
        },
      },
    },
  });

  return NextResponse.json({
    streams: streams.map(({ _count, ...rest }) => ({
      ...rest,
      upvotes: _count.upvotes,
      haveUpvoted: rest.upvotes.length ? true : false,
    })),
  });
}
