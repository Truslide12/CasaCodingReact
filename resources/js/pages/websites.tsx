import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import AppLayout from '@/layouts/guest-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Web Development',
        href: '/websites',
    },
];

export default function Websites() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CasaCoding Websites" />
            <div className="text-center flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden ">
                    <Card className="p-4 border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <CardContent>
                            <CardHeader>WEbsites</CardHeader>
                            <CardHeader>Web Portfolio Of</CardHeader>
                            <CardTitle>Carlos Severiano Aragon</CardTitle>
                            <div className='text-center content-center inline py-4'>
                                <img  className='w-25 content-center m-auto py-4' src='/images/CSAheadshot1.jpg'/>                      
                            </div>
                            <CardDescription className='content-center'>
                                    <p>With over 20 years of Electrical and Software Engineering Experience.</p>
                                    <p>Backed by Proven Performance Results..</p>
                                    <p>Whether for a complete Embedded System to A simple Web App...</p>
                                    <p>Let CasaCoding deliver your dream!</p>
                            </CardDescription>
                            <CardFooter></CardFooter>
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}
