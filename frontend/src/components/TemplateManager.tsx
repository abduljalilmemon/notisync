// File: frontend/src/components/TemplateManager.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Template {
  id: number;
  key: string;
  subject: string;
  body: string;
}

export default function TemplateManager({ token }: { token: string }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [form, setForm] = useState<Partial<Template>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTemplates = async () => {
    const res = await axios.get('http://localhost:8000/api/templates/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTemplates(res.data);
  };

  const saveTemplate = async () => {
    if (editingId) {
      await axios.put(`http://localhost:8000/api/templates/${editingId}/`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post('http://localhost:8000/api/templates/', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    setForm({});
    setEditingId(null);
    fetchTemplates();
  };

  const editTemplate = (template: Template) => {
    setForm(template);
    setEditingId(template.id);
  };

  const deleteTemplate = async (id: number) => {
    await axios.delete(`http://localhost:8000/api/templates/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTemplates();
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Notification Templates</h2>

      <div className="mb-6 bg-gray-100 p-4 rounded">
        <input
          placeholder="Template Key"
          value={form.key || ''}
          onChange={e => setForm({ ...form, key: e.target.value })}
          className="mb-2 w-full p-2 border rounded"
        />
        <input
          placeholder="Subject"
          value={form.subject || ''}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          className="mb-2 w-full p-2 border rounded"
        />
        <textarea
          placeholder="Body (Jinja2 Template)"
          value={form.body || ''}
          onChange={e => setForm({ ...form, body: e.target.value })}
          className="mb-2 w-full p-2 border rounded"
        />
        <button onClick={saveTemplate} className="w-full bg-blue-600 text-white py-2 rounded">
          {editingId ? 'Update Template' : 'Create Template'}
        </button>
      </div>

      <ul className="space-y-4">
        {templates.map(template => (
          <li key={template.id} className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold">{template.key}</h3>
            <p className="text-sm text-gray-500">{template.subject}</p>
            <p className="text-sm whitespace-pre-wrap mt-1">{template.body}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => editTemplate(template)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => deleteTemplate(template.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
