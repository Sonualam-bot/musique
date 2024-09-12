"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, SkipForward, Music2 } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
  );
  return match ? match[1] : null;
};

export default function Component() {
  const [videoUrl, setVideoUrl] = useState("");
  const [queue, setQueue] = useState([
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up",
      votes: 5,
    },
    { id: "L_jWHffIx5E", title: "Smash Mouth - All Star", votes: 3 },
    { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", votes: 2 },
    {
      id: "Eo-KmOd3i7s",
      title:
        "*NSYNC - Bye Bye Bye (Official Video from Deadpool and Wolverine)",
      votes: 4,
    },
  ]);

  const [currentVideo, setCurrentVideo] = useState({
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up",
  });
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const sortedQueue = [...queue].sort((a, b) => b.votes - a.votes);
    setQueue(sortedQueue);
  }, [queue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = getYouTubeId(videoUrl);
    if (id) {
      setQueue((prevQueue) => [
        ...prevQueue,
        { id, title: `New Video ${id}`, votes: 0 },
      ]);
      setVideoUrl("");
      toast.success("Song added to the queue!");
    } else {
      toast.error("Invalid YouTube URL");
    }
  };

  const handleVote = (index: number, increment: number) => {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      newQueue[index].votes += increment;
      return newQueue;
    });
  };

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0]);
      setQueue((prevQueue) => prevQueue.slice(1));
      setIsPlaying(true);
      toast.info(`Now playing: ${queue[0].title}`);
    } else {
      toast.warning("No more songs in the queue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ToastContainer theme="dark" />
      <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">
                Current Song
              </h2>
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
              <div className="mt-2 flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-300">
                  {currentVideo.title}
                </p>
                <Button
                  onClick={playNext}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <SkipForward className="mr-2 h-4 w-4" />
                  Play Next
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">
                Submit a Song
              </h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <Input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enter YouTube URL"
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:border-gray-500"
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Music2 className="mr-2 h-4 w-4" />
                  Add to Queue
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
            <h2 className="text-2xl font-bold mb-4 text-gray-100">
              Song Queue
            </h2>
            {queue.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                The queue is empty. Add some songs!
              </p>
            ) : (
              <ul className="space-y-4">
                {queue.map((video, index) => (
                  <li
                    key={video.id}
                    className="flex items-center space-x-4 bg-gray-700 p-2 rounded-md"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                      alt={video.title}
                      className="w-20 h-15 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-200">
                        {video.title}
                      </p>
                      <p className="text-sm text-gray-400">
                        {video.votes} votes
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleVote(index, 1)}
                        size="sm"
                        variant="outline"
                        className="p-1 bg-gray-600 hover:bg-gray-500 border-gray-500"
                      >
                        <ThumbsUp className="h-4 w-4 text-gray-200" />
                      </Button>
                      <Button
                        onClick={() => handleVote(index, -1)}
                        size="sm"
                        variant="outline"
                        className="p-1 bg-gray-600 hover:bg-gray-500 border-gray-500"
                      >
                        <ThumbsDown className="h-4 w-4 text-gray-200" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
