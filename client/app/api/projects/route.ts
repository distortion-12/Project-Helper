import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tech = searchParams.get('tech');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  let query = supabase.from('projects').select('*');

  // Filtering by tech (array contains)
  if (tech) {
    query = query.contains('tech', [tech]);
  }
  // Filtering by price (if price column exists)
  if (minPrice) {
    query = query.gte('price', Number(minPrice));
  }
  if (maxPrice) {
    query = query.lte('price', Number(maxPrice));
  }

  query = query.order('id', { ascending: true });

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ projects: data });
}
