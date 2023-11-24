interface Props {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export const Widget = ({ title, children, subtitle }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div>
          <h5 className="text-xl text-gray-600 text-center">{title}</h5>
          {children}
          <span className="block text-center text-gray-500">{subtitle}</span>
        </div>
      </div>
    </div>
  )
}
