"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
  BrandIcon as BrandIconType,
  ModalityCard as ModalityCardType,
} from "@/data/home";
import { ensureGsapPlugins } from "@/components/animation/GsapSetup";
import { cn } from "@/lib/cn";

function BrandIconBadge({ icon }: { icon: BrandIconType }) {
  return (
    <span
      className="inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ background: icon.background }}
      aria-hidden
    >
      {/* Homepage uses 40px circle with ~0.75-scale mark */}
      <Image
        src={icon.src}
        alt=""
        width={30}
        height={30}
        className="size-[30px] object-contain"
      />
    </span>
  );
}

type Props = {
  card: ModalityCardType;
};

const colSpanClass: Record<number, string> = {
  7: "md:col-span-7",
  10: "md:col-span-10",
  12: "md:col-span-12",
};

function CategoryChip({ label }: { label: string }) {
  return (
    <div className="absolute left-6 top-6 z-20 inline-flex items-center rounded-full border-0 bg-white px-3 py-1.5 text-xs font-medium text-black">
      <span className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-[var(--th-accent)]" />
      {label}
    </div>
  );
}

function CardNoise() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-[radial-gradient(circle_at_1px_1px,rgb(0_0_0/0.12)_1px,transparent_0)] bg-[length:20px_20px] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_78%)]"
    />
  );
}

/** DeepSeek comparison chart — measured from the homepage recharts @ 311×180 */
function DeepSeekBarChart() {
  const bars = [
    { label: "DS-V4 Pro", h: 81.77 },
    { label: "DS-V3", h: 34.29 },
    { label: "Llama 4", h: 20.44 },
    { label: "Qwen3", h: 12.01 },
  ];
  const yTicks = ["1600B", "1200B", "800B", "400B", "0B"];
  const baseline = 150;
  const chartTop = 8;
  const plotH = baseline - chartTop;

  return (
    <div className="mb-6 flex min-h-0 flex-1 items-center justify-center pt-2">
      <svg
        viewBox="0 0 311 180"
        className="h-[180px] w-full max-w-[311px]"
        role="img"
        aria-label="Total params comparison chart"
      >
        {yTicks.map((t, i) => {
          const y = chartTop + (plotH * i) / (yTicks.length - 1);
          return (
            <g key={t}>
              <line
                x1={40}
                x2={45}
                y1={y}
                y2={y}
                stroke="#666"
                strokeWidth="1"
              />
              <text
                x={38}
                y={y + 3}
                textAnchor="end"
                className="fill-[#666]"
                style={{ fontSize: 10 }}
              >
                {t}
              </text>
            </g>
          );
        })}
        <line x1={45} y1={baseline} x2={303} y2={baseline} stroke="#666" />
        <line x1={45} y1={chartTop} x2={45} y2={baseline} stroke="#666" />
        {bars.map((b, i) => {
          const x = 61 + i * 64.5;
          const y = baseline - b.h;
          const w = 32;
          const r = 4;
          return (
            <g key={b.label}>
              <path
                fill="#4D6BFE"
                d={`M${x},${y + r}A ${r},${r},0,0,1,${x + r},${y}L ${x + w - r},${y}A ${r},${r},0,0,1,${x + w},${y + r}L ${x + w},${baseline}L ${x},${baseline}Z`}
              />
              <line
                x1={x + w / 2}
                y1={baseline}
                x2={x + w / 2}
                y2={baseline + 6}
                stroke="#666"
              />
              <text
                x={x + w / 2}
                y={172}
                textAnchor="middle"
                className="fill-[#666]"
                style={{ fontSize: 10 }}
              >
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Qwen context-window line chart — measured from the homepage recharts */
function QwenLineChart() {
  const points = [
    { label: "Qwen 1.0", x: 40, y: 148.86 },
    { label: "Qwen 1.5", x: 92.6, y: 145.46 },
    { label: "Qwen 2.0", x: 145.2, y: 131.82 },
    { label: "Qwen 2.5", x: 197.8, y: 131.82 },
    { label: "Qwen 3.6", x: 303, y: 8 },
  ];
  const yTicks = ["1000K", "750K", "500K", "250K", "0K"];
  const baseline = 150;
  const chartTop = 8;
  const plotH = baseline - chartTop;
  const path = `M${points[0].x},${points[0].y}C57.533,148.296,75.067,147.728,92.6,145.456C110.133,143.184,127.667,131.824,145.2,131.824C162.733,131.824,180.267,131.824,197.8,131.824C215.333,131.824,232.867,131.682,250.4,131.398C267.933,131.114,285.467,69.557,303,8`;

  return (
    <div className="mb-6 flex min-h-0 flex-1 items-center justify-center pt-2">
      <svg
        viewBox="0 0 311 180"
        className="h-[180px] w-full max-w-[311px]"
        role="img"
        aria-label="Context window growth chart"
      >
        {yTicks.map((t, i) => {
          const y = chartTop + (plotH * i) / (yTicks.length - 1);
          return (
            <g key={t}>
              <line
                x1={34}
                x2={40}
                y1={y}
                y2={y}
                stroke="#666"
                strokeWidth="1"
              />
              <text
                x={32}
                y={y + 3}
                textAnchor="end"
                className="fill-[#666]"
                style={{ fontSize: 10 }}
              >
                {t}
              </text>
            </g>
          );
        })}
        <line x1={40} y1={baseline} x2={303} y2={baseline} stroke="#666" />
        <line x1={40} y1={chartTop} x2={40} y2={baseline} stroke="#666" />
        <path d={path} fill="none" stroke="#8b5cf6" strokeWidth="2" />
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={3.5} fill="#8b5cf6" />
            <line
              x1={p.x}
              y1={baseline}
              x2={p.x}
              y2={baseline + 6}
              stroke="#666"
            />
            <text
              x={p.x}
              y={172}
              textAnchor="middle"
              className="fill-[#666]"
              style={{ fontSize: 9 }}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Seedream: horizontal strip of vertical framed previews */
function ImageStrip({
  images,
  fadeColor,
}: {
  images: string[];
  fadeColor: string;
}) {
  const loop = [...images, ...images];
  return (
    <div
      className="relative mb-3 grid min-h-0 flex-1 place-items-center overflow-hidden rounded-[6px] py-2"
      style={
        {
          ["--logoloop-fadeColor"]: fadeColor,
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor)_0%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor)_0%,transparent_100%)]"
      />
      <div className="flex w-max animate-[th-marquee_28s_linear_infinite] items-center gap-8 will-change-transform motion-reduce:animate-none">
        {loop.map((src, i) => (
          <Image
            key={`${src}-${i}`}
            src={src}
            alt=""
            width={117}
            height={156}
            className="aspect-[3/4] h-[156px] w-[117px] shrink-0 rounded-[4px] border-4 border-white object-cover shadow-[0_8px_18px_rgba(15,23,42,0.1)]"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

/** Qwen Image: polaroids shuffle through poses on hover */
function ImageScatter({ images }: { images: string[] }) {
  const poses = [
    [
      { x: -110, y: 16, rotate: -12, z: 2 },
      { x: -28, y: 26, rotate: -3, z: 4 },
      { x: 48, y: 12, rotate: 7, z: 3 },
      { x: 122, y: 20, rotate: 15, z: 1 },
    ],
    [
      { x: -150, y: -4, rotate: -18, z: 2 },
      { x: -40, y: -20, rotate: -6, z: 5 },
      { x: 58, y: -8, rotate: 10, z: 3 },
      { x: 148, y: 6, rotate: 20, z: 1 },
    ],
    [
      { x: -128, y: 8, rotate: -8, z: 3 },
      { x: 8, y: -14, rotate: 2, z: 5 },
      { x: 96, y: 4, rotate: 12, z: 2 },
      { x: -40, y: 28, rotate: -16, z: 1 },
    ],
    [
      { x: -160, y: 10, rotate: 0, z: 2 },
      { x: -20, y: -6, rotate: -10, z: 4 },
      { x: 36, y: 2, rotate: 6, z: 5 },
      { x: 120, y: 18, rotate: 14, z: 1 },
    ],
  ] as const;

  const [hovered, setHovered] = useState(false);
  const [poseIndex, setPoseIndex] = useState(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (!hovered || reduceMotion.current) return;

    const id = window.setInterval(() => {
      setPoseIndex((prev) => (prev + 1) % poses.length);
    }, 1400);

    return () => window.clearInterval(id);
  }, [hovered, poses.length]);

  const activePose = hovered ? poses[poseIndex]! : poses[0]!;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      className="relative mb-3 grid min-h-[260px] flex-1 place-items-center overflow-hidden rounded-[6px] py-2 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-20 before:w-16 before:bg-gradient-to-r before:from-[#61D263] before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-20 after:w-16 after:bg-gradient-to-l after:from-[#61D263] after:to-transparent"
      onMouseEnter={() => {
        setHovered(true);
        setPoseIndex(1);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setPoseIndex(0);
      }}
    >
      <div className="relative h-[240px] w-full max-w-[460px]">
        {images.slice(0, 4).map((src, i) => {
          const pose = activePose[i] ?? activePose[0]!;
          return (
            <motion.div
              key={`${src}-${i}`}
              className="absolute left-1/2 top-1/2 aspect-[3/4] w-[142px] overflow-hidden rounded-[12px] border-8 border-white shadow-[0_8px_22px_rgba(0,0,0,0.18)] will-change-transform"
              style={{ marginLeft: -71, marginTop: -95, zIndex: pose.z }}
              animate={{
                x: pose.x,
                y: pose.y,
                rotate: pose.rotate,
                scale: hovered ? 1.03 : 1,
              }}
              transition={{
                duration: 0.75,
                ease,
                delay: i * 0.05,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="150px"
                className="object-cover"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function VideoVisual({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }

    video.pause();
    setPlaying(false);
  };

  return (
    <div
      className="group relative mb-6 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[10px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        className="aspect-video h-auto max-h-[340px] w-full rounded-[10px] object-cover"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={togglePlayback}
      />
      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={togglePlayback}
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200",
          // Visible on hover; also while paused so the play control is discoverable
          hovered || !playing
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-black shadow-[0_6px_18px_rgba(0,0,0,0.22)]">
          {playing ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
              className="ml-0.5"
            >
              <path d="M14.642 6.285c1.294.777 1.294 2.653 0 3.43l-9.113 5.468c-1.333.8-3.028-.16-3.029-1.715V2.532C2.5.978 4.196.018 5.53.818z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function AudioPlayer({
  title,
  subtitle,
  duration,
  src,
  barColor,
  playerBg,
  ariaLabel,
}: NonNullable<ModalityCardType["audioMeta"]>) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setTotalDuration(audio.duration || 0);
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [src]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  const progress =
    totalDuration > 0 ? Math.min(100, (currentTime / totalDuration) * 100) : 0;
  const displayDuration =
    totalDuration > 0 ? formatAudioTime(totalDuration) : duration;

  return (
    <div className="mb-6 flex min-h-0 flex-1 items-center">
      <div className="mx-auto w-full max-w-[620px]">
        <audio ref={audioRef} src={src} preload="metadata" />
        <div
          className="rounded-[10px] p-5 shadow-[0_8px_18px_rgba(15,23,42,0.12)]"
          style={{ backgroundColor: playerBg }}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={ariaLabel}
              onClick={togglePlayback}
              className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:bg-white/12"
            >
              {playing ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden
                >
                  <rect x="3" y="2" width="3.5" height="12" rx="1" />
                  <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="ml-0.5 size-4"
                >
                  <path
                    fill="currentColor"
                    d="M14.642 6.285c1.294.777 1.294 2.653 0 3.43l-9.113 5.468c-1.333.8-3.028-.16-3.029-1.715V2.532C2.5.978 4.196.018 5.53.818z"
                  />
                </svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-white">
                {title}
              </div>
              <div className="truncate text-xs text-white/45">{subtitle}</div>
            </div>
            <div className="font-mono text-[10px] text-white/40">
              {displayDuration}
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-100 ease-linear"
                style={{
                  backgroundColor: barColor,
                  width: `${progress}%`,
                }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-white/38">
              <span>{formatAudioTime(currentTime)}</span>
              <span>{playing ? "Playing" : "Paused"}</span>
              <span>{displayDuration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalityCard({ card }: Props) {
  const isDarkTextOnAccent = Boolean(card.textOnAccent);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ensureGsapPlugins();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <motion.article
      ref={ref}
      className={cn(
        "relative h-full overflow-hidden rounded-2xl border border-black/10",
        colSpanClass[card.colSpan] ?? "md:col-span-7",
      )}
      style={{ background: card.cardBg }}
    >
      <CardNoise />
      <div
        className={cn(
          "relative z-10 flex h-full flex-col rounded-2xl p-6 pt-16",
          card.variant === "audio" ? "justify-between" : "",
          card.minHeightClass ?? "md:min-h-[400px]",
        )}
      >
        <CategoryChip label={card.category} />

        {card.variant === "bar-chart" ? <DeepSeekBarChart /> : null}
        {card.variant === "line-chart" ? <QwenLineChart /> : null}
        {card.variant === "image-strip" && card.media ? (
          <ImageStrip images={card.media} fadeColor="#61D263" />
        ) : null}
        {card.variant === "image-scatter" && card.media ? (
          <ImageScatter images={card.media} />
        ) : null}
        {card.variant === "video" && card.videoSrc ? (
          <VideoVisual src={card.videoSrc} />
        ) : null}
        {card.variant === "audio" && card.audioMeta ? (
          <AudioPlayer {...card.audioMeta} />
        ) : null}

        <div className="mt-auto">
          <div className="mb-3 flex items-center gap-3">
            <BrandIconBadge icon={card.brandIcon} />
            <h4
              className={cn(
                "text-2xl font-bold tracking-tight",
                isDarkTextOnAccent ? "text-white" : "text-[var(--th-heading)]",
              )}
            >
              {card.name}
            </h4>
          </div>
          <p
            className={cn(
              "text-sm leading-relaxed",
              isDarkTextOnAccent ? "text-white/80" : "text-black/60",
            )}
          >
            {card.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
