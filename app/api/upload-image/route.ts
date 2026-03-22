import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${nanoid(12)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const db = supabaseAdmin();
    const { error } = await db.storage
      .from("invite-images")
      .upload(filename, buffer, { contentType: file.type, upsert: false });

    if (error) {
      console.error("[upload-image]", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = db.storage
      .from("invite-images")
      .getPublicUrl(filename);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err) {
    console.error("[upload-image]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
