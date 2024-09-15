"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ThumbsUp,
  ThumbsDown,
  SkipForward,
  Music2,
  Share2,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { UseAppContext } from "../AppProvider";
import { YT_REGEX } from "@/lib/utils";

type QueueItem = {
  userId: string;
  url: string;
  extractedId: string;
  type: string;
  title: string;
  smallImg: string;
  bigImg: string;
  hasUpvoted: boolean;
  upvotes: number;
  id: string;
  votes: number;
};

const getYouTubeId = (url: string) => {
  const match = url.match(YT_REGEX);
  return match ? match[1] : null;
};

export default function StreamView({ creatorId }: { creatorId: string }) {
  const session = useSession();
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { queue, setQueue } = UseAppContext();

  // console.log(queue);

  const [currentVideo, setCurrentVideo] = useState({
    id: "a2giXO6eyuI",
    title: "Adele - Set Fire to the Rain",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/streams", {
        method: "POST",
        body: JSON.stringify({
          creatorId: creatorId,
          url: videoUrl,
        }),
      });

      const data = await res.json();
      if (!data || !data.url || !data.extractedId || !data.title) {
        throw new Error("Invalid stream data");
      }

      const newItem: QueueItem = {
        id: data.extractedId,
        userId: data.id,
        url: data.url,
        extractedId: data.extractedId,
        type: data.type,
        title: data.title,
        smallImg: data.smallImg,
        bigImg: data.bigImg,
        hasUpvoted: data.hasUpvoted,
        upvotes: data.upVotes,
        votes: data.upVotes,
      };

      setQueue([...queue, newItem]);
      setVideoUrl("");
      toast.success("Added successfully");
    } catch (error) {
      console.error("Error adding stream:", error);
      toast.error("Failed to add the stream");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (
    index: number,
    increment?: string,
    descrement?: string
  ) => {
    if (increment === "increment") {
      setQueue((prevQueue) => {
        const newQueue = [...prevQueue];
        newQueue[index].votes += 1;
        return newQueue;
      });
    } else {
      setQueue((prevQueue) => {
        const newQueue = [...prevQueue];
        newQueue[index].votes -= 1;
        return newQueue;
      });
    }
  };

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0]);
      setQueue((prevQueue) => prevQueue.slice(1));
      toast.info(`Now playing: ${queue[0].title}`);
    } else {
      toast.warning("No more songs in the queue");
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.hostname}/creator/${creatorId}`;
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        toast.success("Link copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy link");
      }
    );
  };

  async function refreshStreams() {
    const res = await fetch(`/api/streams/?creatorId=${creatorId}`, {
      credentials: "include",
    });
    const json = await res.json();
    setQueue(json.streams);
  }

  useEffect(() => {
    refreshStreams();
    const interval = setInterval(() => {
      refreshStreams();
    }, 10 * 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ToastContainer theme="dark" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Music Queue</h1>
          {session?.data?.user ? (
            <Button
              onClick={() => signOut()}
              variant="ghost"
              className="hover:text-pink-400 transition-colors"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => signIn()}
              variant="ghost"
              className="hover:text-pink-400 transition-colors"
            >
              Sign In
            </Button>
          )}
        </div>

        {session?.data?.user ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Current Song</h2>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=0`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-300 flex-grow mr-2">
                      {currentVideo.title}
                    </p>
                    <Button
                      onClick={playNext}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <SkipForward className="mr-2 h-4 w-4" />
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Submit a Song</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Enter YouTube URL"
                      className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Music2 className="mr-2 h-4 w-4" />
                      {loading ? "Loading..." : "Add to Queue"}
                    </Button>
                  </form>
                  {videoUrl && getYouTubeId(videoUrl) && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2 text-gray-300">
                        Preview:
                      </h3>
                      <img
                        src={`https://img.youtube.com/vi/${getYouTubeId(
                          videoUrl
                        )}/0.jpg`}
                        alt="Video thumbnail"
                        className="w-full rounded-md"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700 h-[calc(100vh-2rem)] overflow-y-auto">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Song Queue</h2>
                  <Button
                    onClick={handleShare}
                    size="sm"
                    variant="outline"
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                {queue.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">
                    The queue is empty. Add some songs!
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {queue.map((video, index) => (
                      <li
                        key={video.id}
                        className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.extractedId}/default.jpg`}
                          alt={video.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-grow min-w-0">
                          <p className="font-semibold text-gray-200 text-sm truncate">
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {video?.upvotes} votes
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            onClick={() => handleVote(index, "increment")}
                            size="sm"
                            variant="outline"
                            className="p-1 bg-gray-600 hover:bg-gray-500 border-gray-500"
                          >
                            <ThumbsUp className="h-3 w-3 text-gray-200" />
                          </Button>
                          <Button
                            onClick={() => handleVote(index, "descrement")}
                            size="sm"
                            variant="outline"
                            className="p-1 bg-gray-600 hover:bg-gray-500 border-gray-500"
                          >
                            <ThumbsDown className="h-3 w-3 text-gray-200" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-100px)]">
            <Button
              onClick={() => signIn()}
              className="text-xl hover:text-pink-400 transition-colors"
            >
              Sign In to Access Music Queue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
