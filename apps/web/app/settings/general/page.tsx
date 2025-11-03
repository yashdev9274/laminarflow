import LanguageDD from '@/components/dashboard/settings/languageDD';
import TimezoneDD from '@/components/dashboard/settings/timezone';
import React from 'react';

const GeneralSettingsPage = () => {
  return (
    <div className="p-6 py-9 flex flex-col gap-y-5" style={{ backgroundColor: 'var(--sidebar-background)', color: 'var(--sidebar-foreground)' }}>
      <div>
         <h1 className="text-2xl font-bold mb-1">
            General
         </h1>
         <p className="mb-6">Manage settings for your language display preferences.</p>
      </div>

      <div className='flex items-col gap-5'>
         <div className="mb-4">
            <label className="block mb-2">Language</label>
            <LanguageDD/>
         </div>

         <div className="mb-4">
            <label className="block mb-2">Timezone</label>
            <TimezoneDD/>
         </div>
      </div>

      <div className="mb-4">
         <label className="block mb-2">Custom AI Prompt</label>
         <textarea
            className="bg-zinc-800 text-white border border-gray-300 rounded p-2 w-full"
            rows={4}
            placeholder="Enter your custom prompt for the AI..."
         />
         <p className="text-sm text-gray-600 mt-2">
            Customize how the AI respond to your replies. This will be added to the base prompt.
         </p>
      </div>

      

      <div>
         <button className="bg-neutral-200 text-black rounded p-2">Save changes</button>
      </div>
   </div>
  );
};

export default GeneralSettingsPage;
