export interface InviteData {
  id?: string;
  partner1: string;
  partner2: string;
  date: string;        // e.g. "September 14, 2025"
  time: string;        // e.g. "4:00 PM"
  venue: string;       // e.g. "The Grand Estate"
  location: string;    // e.g. "Florence, Italy"
  message: string;     // personal note from the couple
  rsvp_email: string;  // where guests send RSVP
  template: string;    // e.g. "elegant-minimal"
  language?: string;   // e.g. "en", "cs", "sk"
  image_url?: string;  // custom couple photo URL
  video_url?: string;  // custom background video URL
}

export interface InviteRecord extends InviteData {
  id: string;
  created_at: string;
  customer_email: string;
  paid: boolean;
}
