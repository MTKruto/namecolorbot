FROM denoland/deno

WORKDIR /src
COPY deno.jsonc .
RUN deno install

COPY . .

CMD ["deno", "-A", "main.ts"]
