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
          'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image table | code preview',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
      onEditorChange={(newContent) => onChange(newContent)}
    />
  );
}