Vertical clips (<= 6 s, muted, <= 1.5 MB). Compress with:
  ffmpeg -i in.mp4 -t 6 -an -vf "scale=720:-2" -c:v libx264 -preset veryfast -crf 28 -movflags +faststart clip1.mp4
  ffmpeg -i clip1.mp4 -frames:v 1 -q:v 4 clip1.jpg
Then list them in content/site.ts → clips (video: '/clips/clip1.mp4', poster: '/clips/clip1.jpg').
