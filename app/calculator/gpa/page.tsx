'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Trash2, RotateCcw, GraduationCap, CheckCircle2, Calculator, Info, ChevronRight, BookOpen, Award } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

// Standard 4.0 Grading Scale
const GRADE_SCALE: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
}

type Course = {
  id: string
  name: string
  grade: string
  credits: string
}

export default function GPACalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: 'A', credits: '3' },
    { id: '2', name: '', grade: 'B', credits: '3' },
    { id: '3', name: '', grade: 'A', credits: '4' },
  ])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Logic Functions ---
  const addCourse = () => {
    const newCourse = { id: Math.random().toString(36).substr(2, 9), name: '', grade: 'A', credits: '3' }
    setCourses([...courses, newCourse])
  }

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id))
    }
  }

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: value } : c)))
    setShowResults(false)
  }

  // --- Calculation Engine ---
  const gpaData = useMemo(() => {
    let totalPoints = 0
    let totalCredits = 0

    courses.forEach(course => {
      const creditNum = parseFloat(course.credits)
      if (!isNaN(creditNum) && creditNum > 0) {
        totalPoints += GRADE_SCALE[course.grade] * creditNum
        totalCredits += creditNum
      }
    })

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
    return { gpa, totalCredits, totalPoints }
  }, [courses])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            GPA <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Track your academic progress. Enter your course credits and grades to calculate your semester grade point average.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Current Semester GPA</span>
                    <h3 className="text-7xl font-black mt-2 tracking-tighter">
                      {gpaData.gpa}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Academic Standing</p>
                        <p className="text-lg font-bold">
                            {parseFloat(gpaData.gpa) >= 3.5 ? 'Dean\'s List Material' : 
                             parseFloat(gpaData.gpa) >= 2.0 ? 'Good Standing' : 'Academic Warning'}
                        </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Semester Stats</h4>
                   <div className="space-y-3">
                      <StatRow label="Total Credits" value={gpaData.totalCredits.toString()} />
                      <StatRow label="Quality Points" value={gpaData.totalPoints.toFixed(1)} />
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <GraduationCap size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Update courses to calculate</p>
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Dynamic Course List */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Course List</h2>
                </div>
                <button 
                  onClick={addCourse}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                >
                  <Plus size={16} /> Add Course
                </button>
              </div>

              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-12 gap-3 items-center group animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="col-span-5 md:col-span-6">
                      <input 
                        type="text" 
                        placeholder={`Course ${index + 1} Name`}
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        className="w-full p-4 bg-muted border-none rounded-2xl text-sm font-semibold focus:ring-2 ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-3">
                      <select 
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full p-4 bg-muted border-none rounded-2xl text-sm font-bold text-primary appearance-none cursor-pointer outline-none focus:ring-2 ring-primary/20"
                      >
                        {Object.keys(GRADE_SCALE).map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2 md:col-span-2">
                      <input 
                        type="number" 
                        placeholder="Cr."
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                        className="w-full p-4 bg-muted border-none rounded-2xl text-sm font-bold text-center focus:ring-2 ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1 flex justify-center">
                      <button 
                        onClick={() => removeCourse(course.id)}
                        className="p-2 text-muted-foreground hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col md:flex-row gap-4 border-t border-border pt-8">
                <button 
                  onClick={() => setShowResults(true)}
                  className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  Calculate GPA <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => {setCourses([{ id: '1', name: '', grade: 'A', credits: '3' }]); setShowResults(false);}}
                  className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">How is GPA Calculated?</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Your Grade Point Average (GPA) is calculated by dividing the total amount of <strong>Quality Points</strong> earned by the total amount of <strong>Credit Hours</strong> attempted.
                    </p>
                    
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl space-y-2">
                        <p className="text-xs font-bold text-primary uppercase">The Formula</p>
                        <code className="text-lg font-bold">GPA = Σ (Grade Value × Credits) / Σ Credits</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Grading Scale (4.0)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <ScaleItem label="A / A+" val="4.0" />
                            <ScaleItem label="A-" val="3.7" />
                            <ScaleItem label="B+" val="3.3" />
                            <ScaleItem label="B" val="3.0" />
                        </div>
                        <div className="space-y-2">
                            <ScaleItem label="B-" val="2.7" />
                            <ScaleItem label="C+" val="2.3" />
                            <ScaleItem label="C" val="2.0" />
                            <ScaleItem label="F" val="0.0" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Grade Calculator', description: 'Final exam score predictor', href: '/calculator/grade', icon: Award },
          { name: 'Scientific Notation', description: 'Math format converter', href: '/calculator/scientific-notation', icon: Calculator }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-primary">{value}</span>
    </div>
  )
}

function ScaleItem({ label, val }: { label: string, val: string }) {
  return (
    <div className="flex justify-between p-2 bg-muted/30 rounded-lg text-xs font-bold">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary">{val}</span>
    </div>
  )
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 bg-muted/50 rounded-2xl border border-border text-sm leading-relaxed text-muted-foreground hover:border-primary/30 transition-colors">
      <ChevronRight size={18} className="text-primary shrink-0" />
      <p>{text}</p>
    </div>
  )
}