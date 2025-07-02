'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export default function TinyEditor({ value, onChange }: any) {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      apiKey='i87cv0p3i4v2xw6coop2wtnrf4wbyt8ouu8mdmivoeorneb5'
      value={value}
      init={{
        height: 400,
        menubar: false,
        plugins: 'lists link image preview code table code preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media table charmap nonbreaking anchor advlist lists wordcount charmap quickbars emoticons',
        toolbar:
          'formatselect | undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image table | code preview',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        block_formats: 'Paragraph=p; Div=div; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4',
      }}
      onEditorChange={(newContent) => onChange(newContent)}
    />
  );
}