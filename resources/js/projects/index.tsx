import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects List',
        href: route('/projects/index'),
    },
];

export default function Projects() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Add Product */}
                <div className='ml-auto'>
                    <Link type='button' className="button bg-indigo-400 rounded-lg cursor-pointer hover:opacity-90 text-md" href={route('projects.create')}>Add Project</Link>
                </div>
                {/* Product List */}
                <div className="overflow-hidden rounded-lg boarder background-blue shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="overflow-hidden rounded-lg border background shadow-sm">
                                <th className="border p-4">#</th>
                                <th className="border p-4">Title</th>
                                <th className="border p-4">Description</th>
                                <th className="border p-4">Type</th>
                                <th className="border p-4">Image</th>
                                <th className="border p-4">Tags</th>
                                <th className="border p-4">Start</th>
                                <th className="border p-4">Finish</th>
                                <th className="border p-4">Duration</th>
                            </tr>
                        </thead>
                    </table>
                    <tbody>
                        @foreach($products as $product)
                            <td className="border px-4 py-2 text-center"></td>
                        @endforeach
                    </tbody>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
