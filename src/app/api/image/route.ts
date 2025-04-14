import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment';
import { writeFile } from 'fs/promises';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      throw new Error('파일을 업로드 해주세요.');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const prevFilename = file.name.replaceAll('_', '');
    const fileName = `${moment().format(
      'YYYYMMDDHHmmdd',
    )}${prevFilename.trim()}`;
    const path = `${process.cwd()}/public/images/${fileName}`;

    await writeFile(path, buffer);

    return NextResponse.json({
      url: `images/${fileName}`,
    });
  } catch (err: any) {
    throw new Error('업로드 에러 ', err);
  }
}
